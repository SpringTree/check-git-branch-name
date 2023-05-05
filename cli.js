#!/usr/bin/env node
const program = require( 'commander' );
const jsonfile = require( 'jsonfile' );
const path = require( 'path' );
const checkGitBranchName = require( './index' );

// Determine script location
//
const appRoot = path.resolve( __dirname );

// Load package.json
//
const selfPkg = jsonfile.readFileSync( path.resolve( appRoot, 'package.json' ) );

// Collect command-line options and arguments
//
program
  .version( selfPkg.version )
  .usage( '[options]' )

  .option( '-e, --evenReleases', 'Enforce release and hotfix to have even minor versions' )

  .option( '-t, --test <value>', 'Test provided branch name' )

  .parse( process.argv );

// Collect options
//
program.parse();
const opts = program.opts();
const options = {
  evenReleases: opts.evenReleases,
  test: opts.test,
};

// Validate the branch and exit with success or failure
//
if ( checkGitBranchName( options ) ) {
  process.exit( 0 );
}
process.exit( 1 );
