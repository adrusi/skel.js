#!/usr/bin/env node
/**
 * This script installs skel (not flesh) into one of the paths searched in when a module is `require`d in node.
 * (A path in require.paths)
 * 
 * Eventually skel will be made available through npm, but not until it is a stable product.
 */
require("fs").writeFile(require.paths[0], require("fs").readFileSync("skel.js"), function(error) {
  console.log((error) ? error : "Skel successfully installed");
});