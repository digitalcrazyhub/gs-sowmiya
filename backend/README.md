# GS SOWMIYA BUILDERS — BACKEND LEAD ARCHITECTURE

Production-ready, high-security PHP/MySQL backend for enquiry and lead management for the **GS Sowmiya Builders Private Limited** website.

---

## 1. ARCHITECTURE OVERVIEW

```text
       ┌───────────────────────────────┐        ┌──────────────────────────────┐
       │   Homepage Enquiry Form       │        │  Contact Page Enquiry Form   │
       │  (source: homepage_contact)   │        │   (source: contact_page)     │
       └──────────────┬────────────────┘        └──────────────┬───────────────┘
                      │                                        │
                      └───────────────────┬────────────────────┘
                                          │ POST (JSON) + reCAPTCHA v3
                                          ▼
                             /backend/api/contact.php
                                          │
                        ┌─────────────────┴─────────────────┐
                        │ 1. Rate Limiting (IP/Window)      │
                        │ 2. Google reCAPTCHA v3 Validation │
                        │ 3. Server-Side Input Sanitization │
                        └─────────────────┬─────────────────┘
                                          │
                                          ▼
                                   MySQL Database
                             (INSERT INTO `leads` Table)
                                   * COMMIT FIRST *
                                          │
                        ┌─────────────────┴─────────────────┐
                        │ RETURN HTTP 200 SUCCESS TO CLIENT │
                        │ (Triggers Existing Frontend Alert)│
                        └─────────────────┬─────────────────┘
                                          │
                    ┌─────────────────────┼─────────────────────┐
                    │ (FastCGI / Cron)    │ (FastCGI / Cron)    │ (FastCGI / Cron)
                    ▼                     ▼                     ▼
             Company Email         Customer Email         Google Sheets
            (Official Alert)       (Thank-You Note)       (Lead Backup)
                    │                     │                     │
                    └─────────────────────┼─────────────────────┘
                                          │
                                          ▼
                                Status & Retry Queue
                           (Idempotent MySQL Statuses)
```

---

## 2. DIRECTORY STRUCTURE

```text
/backend/
├── .htaccess                 # Apache security rules (blocks direct access to internal files)
├── .env.example              # Environment variables template
├── composer.json             # PHP dependencies (PHPMailer, Google API Client)
├── README.md                 # Technical & deployment documentation
├── api/
│   └── contact.php           # Public API endpoint (POST handler)
├── config/
│   ├── app.php               # Environment loader, security headers, rate limits
│   ├── database.php          # MySQL PDO configuration
│   ├── mail.php              # PHPMailer & SMTP credentials
│   ├── recaptcha.php         # Google reCAPTCHA v3 settings
│   ├── google-sheets.php     # Google Sheets API settings
│   └── private/              # Directory for private keys (e.g. service account JSON)
├── database/
│   ├── schema.sql            # Master MySQL table schema
│   └── migrations/
│       └── 001_create_leads.sql
├── services/
│   ├── Database.php          # Singleton PDO connection manager
│   ├── LeadService.php       # Lead validation, ID generation, rate limits, MySQL logic
│   ├── RecaptchaService.php  # Server-side reCAPTCHA token verification
│   ├── EmailService.php      # PHPMailer & authenticated SMTP notifications
│   └── GoogleSheetsService.php # Google Sheets synchronization
├── queue/
│   └── process.php           # Cron worker for async processing & retry backoff
└── logs/
    └── .gitkeep              # Application log directory
```

---

## 3. HOSTINGER PRODUCTION DEPLOYMENT GUIDE

### Step 1: Upload Files
1. Build the frontend locally or via CI:
   ```bash
   npm run build
   ```
2. Upload the static frontend contents (HTML, CSS, JS, assets) into `public_html/`.
3. Upload the entire `/backend` directory directly into `public_html/backend/`.

### Step 2: Create MySQL Database in Hostinger hPanel
1. Log in to Hostinger hPanel -> **Databases** -> **Management**.
2. Create a new database:
   - Database Name: `u123456789_gssowmiya_db`
   - Database User: `u123456789_dbuser`
   - Password: `[GENERATE_A_SECURE_PASSWORD]`
3. Open **phpMyAdmin** for this database.
4. Go to the **Import** tab, choose `/backend/database/schema.sql`, and execute it.
   - Creates the `leads` table and `rate_limits` table.

### Step 3: Configure Environment Variables
1. In Hostinger File Manager, navigate to `public_html/backend/`.
2. Copy `.env.example` to `.env`.
3. Fill in your live production values:
   ```ini
   APP_ENV=production
   APP_DEBUG=false
   APP_URL=https://gssowmiyabuilders.com

   DB_HOST=localhost
   DB_PORT=3306
   DB_NAME=u123456789_gssowmiya_db
   DB_USER=u123456789_dbuser
   DB_PASSWORD=your_actual_password_here

   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=465
   SMTP_USERNAME=no-reply@gssowmiyabuilders.com
   SMTP_PASSWORD=your_mailbox_password_here
   SMTP_ENCRYPTION=ssl
   MAIL_FROM=no-reply@gssowmiyabuilders.com
   MAIL_FROM_NAME="GS Sowmiya Builders"
   COMPANY_EMAIL=md@sowmiyabuilders.com

   RECAPTCHA_ENABLED=true
   RECAPTCHA_SITE_KEY=your_recaptcha_v3_site_key
   RECAPTCHA_SECRET_KEY=your_recaptcha_v3_secret_key
   RECAPTCHA_MIN_SCORE=0.5
   ```

### Step 4: Install Dependencies (Optional)
If SSH/Terminal access is available on Hostinger:
```bash
cd /home/u123456789/domains/gssowmiyabuilders.com/public_html/backend
composer install --no-dev --optimize-autoloader
```
*Note: Even without Composer, `EmailService` and `GoogleSheetsService` contain resilient native fallback clients for authenticated SMTP and OAuth2 JWT REST execution.*

### Step 5: Configure Background Queue Cron Job
In Hostinger hPanel -> **Advanced** -> **Cron Jobs**:
- Choose **Custom**.
- Command:
  ```bash
  /usr/bin/php /home/u123456789/domains/gssowmiyabuilders.com/public_html/backend/queue/process.php >> /dev/null 2>&1
  ```
- Frequency: Every 5 minutes (`*/5 * * * *`).

---

## 4. API SPECIFICATION

### `POST /backend/api/contact.php`

#### Request Headers
```http
Content-Type: application/json
Accept: application/json
```

#### Request Payload
```json
{
  "name": "Senthil Nathan",
  "phone": "+91 98765 43210",
  "email": "senthil@example.com",
  "location": "Pallikaranai, Chennai",
  "service": "Residential Construction",
  "message": "Looking to construct a 3 BHK duplex home on a 2,000 sq.ft plot.",
  "source": "homepage_contact",
  "recaptcha_token": "03AFcWeA7..."
}
```

#### Success Response (`HTTP 200 OK`)
```json
{
  "success": true,
  "message": "Your enquiry has been received. Our team will review your requirements and get in touch with you soon.",
  "lead_id": "GS-20261005-4B8F12"
}
```

#### Validation Error Response (`HTTP 422 Unprocessable Entity`)
```json
{
  "success": false,
  "message": "Please enter a valid phone number (8-15 digits).",
  "errors": {
    "phone": "Please enter a valid phone number (8-15 digits)."
  }
}
```

#### Rate Limit Exceeded (`HTTP 429 Too Many Requests`)
```json
{
  "success": false,
  "message": "Too many enquiries submitted from this network. Please wait a few minutes or call us directly at +91 90431 56670."
}
```

---

## 5. SECURITY GUARANTEES

1. **Transactional MySQL Persistence**: Every valid lead is saved to MySQL in an atomic transaction before external calls. External API downtime never loses customer leads.
2. **Strict Parameterized Queries**: 100% of database interactions use PDO prepared statements. Zero string concatenation.
3. **Defense-in-Depth reCAPTCHA v3**: Scores below `0.5` are rejected with HTTP 400 before database insertion.
4. **Access Control**: `/backend/.htaccess` completely hides internal directories (`/config`, `/database`, `/services`, `/queue`, `/logs`) from direct HTTP access.
5. **Rate Limiting**: Built-in sliding window IP limiter blocks automated script flooding.
6. **XSS Protection**: All email templates pass user inputs through `htmlspecialchars(..., ENT_QUOTES, 'UTF-8')`.
7. **Zero Exposed Credentials**: Secrets remain exclusively inside server-side `.env`.
