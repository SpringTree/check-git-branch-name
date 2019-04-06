const checkGitBranchName = require( '../index' );

describe( 'check-git-branch-name', () => {
  // Options
  //
  test( 'default options', () => {
    const valid = checkGitBranchName();
    expect( valid ).toBeDefined();
  } );

  test( 'supress output', () => {
    const valid = checkGitBranchName( { test: 'nonsense', silent: true } );
    expect( valid ).toEqual( false );
  } );


  // Unknown branch name
  //
  test( 'invalid nonsense branch', () => {
    const valid = checkGitBranchName( { test: 'nonsense' } );
    expect( valid ).toEqual( false );
  } );

  // Too many components
  //
  test( 'invalid branch with too many components', () => {
    const valid = checkGitBranchName( { test: 'all/the/small/things' } );
    expect( valid ).toEqual( false );
  } );

  // Master
  //
  test( 'valid master branch', () => {
    const valid = checkGitBranchName( { test: 'master' } );
    expect( valid ).toEqual( true );
  } );

  test( 'invalid master branch', () => {
    const valid = checkGitBranchName( { test: 'master/jimbo' } );
    expect( valid ).toEqual( false );
  } );

  // Develop
  //
  test( 'valid develop branch', () => {
    const valid = checkGitBranchName( { test: 'develop' } );
    expect( valid ).toEqual( true );
  } );

  test( 'invalid develop branch', () => {
    const valid = checkGitBranchName( { test: 'develop/spine' } );
    expect( valid ).toEqual( false );
  } );

  // Feature
  //
  test( 'valid feature branch', () => {
    const valid = checkGitBranchName( { test: 'feature/stuff' } );
    expect( valid ).toEqual( true );
  } );

  // Experiment
  //
  test( 'valid experiment branch', () => {
    const valid = checkGitBranchName( { test: 'experiment/break-stuff' } );
    expect( valid ).toEqual( true );
  } );

  // Release
  //
  test( 'valid release branch', () => {
    const valid = checkGitBranchName( { test: 'release/0.11' } );
    expect( valid ).toEqual( true );
  } );

  test( 'invalid release branch contains invalid version', () => {
    const valid = checkGitBranchName( { test: 'release/beta', evenReleases: true } );
    expect( valid ).toEqual( false );
  } );

  test( 'invalid release branch contains patch version', () => {
    const valid = checkGitBranchName( { test: 'release/0.11.1', evenReleases: true } );
    expect( valid ).toEqual( false );
  } );

  test( 'valid release branch with even check', () => {
    const valid = checkGitBranchName( { test: 'release/0.12', evenReleases: true } );
    expect( valid ).toEqual( true );
  } );

  test( 'invalid release branch with even check', () => {
    const valid = checkGitBranchName( { test: 'release/0.11', evenReleases: true } );
    expect( valid ).toEqual( false );
  } );

  // Hotfix
  //
  test( 'valid hotfix branch', () => {
    const valid = checkGitBranchName( { test: 'hotfix/0.10.1' } );
    expect( valid ).toEqual( true );
  } );

  test( 'invalid hotfix branch contains invalid version', () => {
    const valid = checkGitBranchName( { test: 'hotfix/beta', evenReleases: true } );
    expect( valid ).toEqual( false );
  } );

  test( 'valid hotfix branch with even check', () => {
    const valid = checkGitBranchName( { test: 'hotfix/0.10.1', evenReleases: true } );
    expect( valid ).toEqual( true );
  } );

  test( 'invalid hotfix branch with even check', () => {
    const valid = checkGitBranchName( { test: 'hotfix/0.11.1', evenReleases: true } );
    expect( valid ).toEqual( false );
  } );
} );
