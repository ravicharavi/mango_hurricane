#!/bin/bash

# Financial Tracker - Git Workflow Script
# This script helps you commit and push changes to GitHub

set -e

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}💰 Financial Tracker - Git Workflow${NC}\n"

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo -e "${RED}Error: Not a git repository${NC}"
    exit 1
fi

# Check for uncommitted changes
if [ -z "$(git status --porcelain)" ]; then
    echo -e "${YELLOW}No changes to commit.${NC}"
    exit 0
fi

# Show status
echo -e "${BLUE}Current status:${NC}"
git status --short
echo ""

# Ask for commit message
if [ -z "$1" ]; then
    echo -e "${YELLOW}Enter commit message (or press Enter for default):${NC}"
    read -r commit_message
    if [ -z "$commit_message" ]; then
        commit_message="Update financial tracker"
    fi
else
    commit_message="$1"
fi

# Add all changes
echo -e "${BLUE}Staging changes...${NC}"
git add .

# Commit
echo -e "${BLUE}Committing changes...${NC}"
git commit -m "$commit_message"

# Show what branch we're on
current_branch=$(git branch --show-current)
echo -e "${GREEN}✓ Committed to branch: ${current_branch}${NC}"

# Ask if user wants to push
echo -e "${YELLOW}Push to GitHub? (y/n)${NC}"
read -r push_confirm

if [ "$push_confirm" = "y" ] || [ "$push_confirm" = "Y" ]; then
    echo -e "${BLUE}Pushing to GitHub...${NC}"
    git push origin "$current_branch"
    echo -e "${GREEN}✓ Successfully pushed to GitHub!${NC}"
else
    echo -e "${YELLOW}Changes committed locally. Push manually with: git push${NC}"
fi

echo -e "${GREEN}✓ Done!${NC}"
