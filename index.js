// Import all our dependencies
//
const colors = require( 'colors/safe' );
const childProcess = require( 'child_process' );

/**
 * Logs a nicely colored success message
 *
 * @param {*} branchName The git branch name
 */
const logValidBranch = ( branchName ) => {
  console.log( `Found ${colors.green( 'valid' )} branch named '${colors.magenta( branchName )}'` );
};

/**
 * Logs a nicely colored failure message
 *
 * @param {*} branchName The git branch name
 */
const logInvalidBranch = ( branchName ) => {
  console.log( `Found ${colors.red( 'invalid' )} branch named '${colors.magenta( branchName )}'` );
};

const getCurrentBranchName = () => {
  const bufferedResponse = childProcess.execSync('git rev-parse --abbrev-ref HEAD');
  return bufferedResponse.toString().trim();
}

/**
 * This module exports a single function that will return a boolean
 * indicating the branch name is either valid or invalid
 *
 * @returns boolean
 * @param {*} options Check and output options
 */
module.exports = ( options ) => {
  const currentBranch = options && options.test ? `${options.test}` : getCurrentBranchName();

  // Check posted options
  //
  let evenReleases = false;
  if ( options ) {
    // The even releases option also checks that the following branches
    // have even minor versions:
    //
    // * hotfix
    // * release
    //
    if ( options.evenReleases === true ) {
      evenReleases = true;
    }
  }

  // Collect the branch name and root path
  //
  const branchParts = `${currentBranch}`.split( '/' );
  const rootBranch = branchParts[0];

  // There should not be more then 1 slash in the path
  // Disabled this check for now. I can't find any definitive information about
  // if multiple parts are allowed or not
  //
  // if ( branchParts.length > 2 ) {
  //   console.error( 'Branch name should only contain 2 parts. Ex: feature/next-best-thing' );
  //   return false;
  // }

  switch ( rootBranch ) {
    case 'develop':
    case 'master':
    case 'main': {
      // Only exact match allowed
      //
      if ( currentBranch !== rootBranch ) {
        logInvalidBranch( currentBranch );
        console.error( `Branch should exactly match '${rootBranch}'` );
        return false;
      }

      logValidBranch( currentBranch );
      return true;
    }

    case 'experiment':
    case 'feature': {
      logValidBranch( currentBranch );
      return true;
    }

    case 'hotfix': {
      // Hotfix should have the version after the slash
      //
      const hotfixVersion = branchParts[1];
      if ( !hotfixVersion.match( /[0-9]*\.[0-9*]*\.[0-9*]/ ) ) {
        logInvalidBranch( currentBranch );
        console.error( 'Hotfix branch should contain the version. Ex. hotfix/0.12.1' );
        return false;
      }

      // Optional check minor version is even
      //
      const [, minor] = hotfixVersion.split( '.' );
      if ( evenReleases && minor % 2 !== 0 ) {
        logInvalidBranch( currentBranch );
        console.error( 'Hotfix branch minor version should be even. Ex. hotifx/0.12.1' );
        return false;
      }

      logValidBranch( currentBranch );
      return true;
    }

    case 'release': {
      // Release should have the version without patch level after the slash
      //
      const releaseName = branchParts[1];
      if ( !releaseName.match( /[0-9]*\.[0-9*]/ ) ) {
        logInvalidBranch( currentBranch );
        console.error( 'Release branch should contain the version without the patch level. Ex. release/0.12' );
        return false;
      }

      // Optionally check minor version is even
      //
      const [, minor] = releaseName.split( '.' );
      if ( evenReleases && minor % 2 !== 0 ) {
        logInvalidBranch( currentBranch );
        console.error( 'Release branch minor version should be even. Ex. release/0.12' );
        return false;
      }

      logValidBranch( currentBranch );
      return true;
    }

    default: {
      logInvalidBranch( currentBranch );
      return false;
    }
  }
};
