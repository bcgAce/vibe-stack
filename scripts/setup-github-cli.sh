#!/bin/bash

# GitHub CLI Installation Script
# Created: 2025-08-22
# Purpose: Install GitHub CLI on macOS, Linux, and Windows (WSL)

set -e  # Exit on any error

echo "🐙 Setting up GitHub CLI..."

# Check if gh is already installed
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI already installed: $(gh --version | head -n1)"
    
    # Check if authenticated
    if gh auth status &> /dev/null; then
        echo "✅ Already authenticated with GitHub"
        echo "📋 Current user: $(gh api user --jq '.login')"
    else
        echo "🔐 Please authenticate with GitHub..."
        gh auth login
    fi
    
    echo "✅ GitHub CLI setup complete!"
    exit 0
fi

# Detect operating system
OS="unknown"
if [[ "$OSTYPE" == "darwin"* ]]; then
    OS="macos"
elif [[ "$OSTYPE" == "linux-gnu"* ]] || [[ -n "$WSL_DISTRO_NAME" ]]; then
    OS="linux"
elif [[ "$OSTYPE" == "msys" ]] || [[ "$OSTYPE" == "cygwin" ]]; then
    echo "❌ Please use WSL (Windows Subsystem for Linux) for Windows development"
    echo "   This script supports WSL but not native Windows shells"
    exit 1
else
    echo "❌ Unsupported operating system: $OSTYPE"
    exit 1
fi

echo "🔍 Detected OS: $OS"

# Install GitHub CLI based on OS
case $OS in
    "macos")
        echo "📦 Installing GitHub CLI via Homebrew..."
        if command -v brew &> /dev/null; then
            brew install gh
        else
            echo "❌ Homebrew not found. Please install Homebrew first:"
            echo "   /bin/bash -c \"\$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)\""
            exit 1
        fi
        ;;
    
    "linux")
        echo "📦 Installing GitHub CLI via official repository..."
        
        # Detect Linux distribution
        if command -v apt &> /dev/null; then
            # Debian/Ubuntu/WSL
            echo "🐧 Installing for Debian/Ubuntu..."
            
            # Install required packages
            sudo apt update
            sudo apt install -y curl gpg
            
            # Add GitHub CLI repository
            curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
            sudo chmod go+r /usr/share/keyrings/githubcli-archive-keyring.gpg
            echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
            
            # Install GitHub CLI
            sudo apt update
            sudo apt install -y gh
            
        elif command -v yum &> /dev/null; then
            # RedHat/CentOS/Fedora
            echo "🎩 Installing for RedHat/CentOS/Fedora..."
            
            sudo yum install -y yum-utils
            sudo yum-config-manager --add-repo https://cli.github.com/packages/rpm/gh-cli.repo
            sudo yum install -y gh
            
        elif command -v dnf &> /dev/null; then
            # Modern Fedora
            echo "🎩 Installing for Fedora (dnf)..."
            
            sudo dnf install -y 'dnf-command(config-manager)'
            sudo dnf config-manager --add-repo https://cli.github.com/packages/rpm/gh-cli.repo
            sudo dnf install -y gh
            
        elif command -v pacman &> /dev/null; then
            # Arch Linux
            echo "🏹 Installing for Arch Linux..."
            sudo pacman -S --noconfirm github-cli
            
        elif command -v zypper &> /dev/null; then
            # openSUSE
            echo "🦎 Installing for openSUSE..."
            sudo zypper addrepo https://cli.github.com/packages/rpm/gh-cli.repo
            sudo zypper refresh
            sudo zypper install -y gh
            
        else
            echo "❌ Unsupported Linux distribution. Please install manually:"
            echo "   Visit: https://cli.github.com/"
            exit 1
        fi
        ;;
esac

# Verify installation
if command -v gh &> /dev/null; then
    echo "✅ GitHub CLI installed successfully: $(gh --version | head -n1)"
else
    echo "❌ Installation failed. Please install manually from https://cli.github.com/"
    exit 1
fi

# Authenticate with GitHub
echo "🔐 Setting up GitHub authentication..."
gh auth login

echo "✅ GitHub CLI setup complete!"

# Set up backlog labels if inside a GitHub repo
if gh repo view &> /dev/null; then
    echo ""
    echo "📋 Setting up backlog labels..."
    gh label create "backlog"  --description "Ideas and future work"    --color "0E8A16" --force 2>/dev/null
    gh label create "idea"     --description "Raw idea — needs refining" --color "1D76DB" --force 2>/dev/null
    gh label create "bug"      --description "Something is broken"      --color "D73A4A" --force 2>/dev/null
    gh label create "quick-win" --description "Small effort, clear value" --color "FEF2C0" --force 2>/dev/null
    echo "✅ Backlog labels ready"
fi

echo ""
echo "Next steps:"
echo "1. You can now create PRs with: gh pr create"
echo "2. Log ideas with: gh issue create --label idea --title \"my idea\""
echo "3. View your backlog: gh issue list --label backlog"
echo ""
echo "For more commands, run: gh --help"