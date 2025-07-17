# .devcontainer/post-start.sh
#!/usr/bin/env bash
set -e

# Setup Local Node
sudo npm install -g npm@11.4.2
cd ./hedera-local-node
npm install && npm run build && sudo npm install -g && hedera stop && hedera start -d --verbose=trace

# Deploy CTF
sudo apt-get update && sudo apt-get install -y netcat
cd ../leet_token_claim
nc -z -w 60 localhost 7546 && npm install && npx hardhat run ./scripts/deploy-hedera.js
