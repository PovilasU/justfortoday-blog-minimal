#!/bin/bash

# Configuration
PROJECT_DIR="/home/povilas/justfortoday-blog-minimal"
LOG_FILE="/home/povilas/justfortoday-blog-update.log"
GIT_CMD="/usr/bin/git"

# Create log entry with timestamp
log() {
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" >> "$LOG_FILE"
}

# Start log
log "==== Starting update ===="

# Go to project directory
if cd "$PROJECT_DIR"; then
  log "Changed directory to $PROJECT_DIR"
else
  log "ERROR: Failed to change directory to $PROJECT_DIR"
  exit 1
fi

# Pull latest changes
if $GIT_CMD pull --quiet; then
  log "Git pull completed successfully"
else
  log "ERROR: Git pull failed"
  exit 1
fi

log "==== Update complete ===="
