#!/bin/sh

find . -name "*" -and -not -name "generate_documentation.sh" -and -not -name "package.json" -and -not -path '*/\.*' -and -not -path './node_modules*' -exec rm -rf {} \;

yuidoc -t node_modules/yuidoc-lucid-theme -H node_modules/yuidoc-lucid-theme/helpers/helpers.js ../node-denon-client/lib -o ./

