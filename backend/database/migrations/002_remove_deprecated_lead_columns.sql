-- Migration: 002_remove_deprecated_lead_columns
-- Description: Drop removed columns (lead_id, ip_address, recaptcha_score, recaptcha_action, processing_attempts, next_attempt_at, last_error, created_at) from leads table
-- Note: Run this if you have an existing leads table to align it with the streamlined schema.

SET @exist := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_name = 'leads' AND index_name = 'idx_lead_id' AND table_schema = DATABASE());
SET @sqlstmt := IF(@exist > 0, 'ALTER TABLE `leads` DROP INDEX `idx_lead_id`', 'SELECT 1');
PREPARE stmt FROM @sqlstmt; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @exist := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_name = 'leads' AND index_name = 'idx_created_at' AND table_schema = DATABASE());
SET @sqlstmt := IF(@exist > 0, 'ALTER TABLE `leads` DROP INDEX `idx_created_at`', 'SELECT 1');
PREPARE stmt FROM @sqlstmt; EXECUTE stmt; DEALLOCATE PREPARE stmt;

SET @exist := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_name = 'leads' AND index_name = 'idx_processing_queue' AND table_schema = DATABASE());
SET @sqlstmt := IF(@exist > 0, 'ALTER TABLE `leads` DROP INDEX `idx_processing_queue`', 'SELECT 1');
PREPARE stmt FROM @sqlstmt; EXECUTE stmt; DEALLOCATE PREPARE stmt;

-- Drop columns if they exist
ALTER TABLE `leads`
  DROP COLUMN IF EXISTS `lead_id`,
  DROP COLUMN IF EXISTS `ip_address`,
  DROP COLUMN IF EXISTS `recaptcha_score`,
  DROP COLUMN IF EXISTS `recaptcha_action`,
  DROP COLUMN IF EXISTS `processing_attempts`,
  DROP COLUMN IF EXISTS `next_attempt_at`,
  DROP COLUMN IF EXISTS `last_error`,
  DROP COLUMN IF EXISTS `created_at`;

-- Add streamlined status index if not present
SET @exist := (SELECT COUNT(*) FROM information_schema.statistics WHERE table_name = 'leads' AND index_name = 'idx_processing_status' AND table_schema = DATABASE());
SET @sqlstmt := IF(@exist = 0, 'ALTER TABLE `leads` ADD KEY `idx_processing_status` (`processing_status`)', 'SELECT 1');
PREPARE stmt FROM @sqlstmt; EXECUTE stmt; DEALLOCATE PREPARE stmt;
