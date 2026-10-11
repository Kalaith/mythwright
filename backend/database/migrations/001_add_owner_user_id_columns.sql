-- Add tenant ownership columns for existing Writers Studio databases.
-- Apply this migration once before enabling the server-authoritative API.
-- Fresh databases receive these columns and indexes from database/schema.sql.
ALTER TABLE series ADD COLUMN owner_user_id VARCHAR(255) NULL;
ALTER TABLE books ADD COLUMN owner_user_id VARCHAR(255) NULL;
ALTER TABLE stories ADD COLUMN owner_user_id VARCHAR(255) NULL;
ALTER TABLE chapters ADD COLUMN owner_user_id VARCHAR(255) NULL;
ALTER TABLE characters ADD COLUMN owner_user_id VARCHAR(255) NULL;
ALTER TABLE character_templates ADD COLUMN owner_user_id VARCHAR(255) NULL;
ALTER TABLE story_templates ADD COLUMN owner_user_id VARCHAR(255) NULL;

CREATE INDEX idx_series_owner_user_id ON series(owner_user_id);
CREATE INDEX idx_books_owner_user_id ON books(owner_user_id);
CREATE INDEX idx_stories_owner_user_id ON stories(owner_user_id);
CREATE INDEX idx_chapters_owner_user_id ON chapters(owner_user_id);
CREATE INDEX idx_characters_owner_user_id ON characters(owner_user_id);
CREATE INDEX idx_character_templates_owner_user_id ON character_templates(owner_user_id);
CREATE INDEX idx_story_templates_owner_user_id ON story_templates(owner_user_id);
