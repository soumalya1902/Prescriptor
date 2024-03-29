"use strict";

const authCloudImplicit = async () => {
  // [START auth_cloud_implicit]
  // Imports the Google Cloud client library.
  const { Storage } = require("@google-cloud/storage");

  // Instantiates a client. If you don't specify credentials when constructing
  // the client, the client library will look for credentials in the
  // environment.
  const storage = new Storage();

  try {
    // Makes an authenticated API request.
    const results = await storage.getBuckets();

    const [buckets] = results;

    console.log("Buckets:");
    buckets.forEach((bucket) => {
      console.log(bucket.name);
    });
  } catch (err) {
    console.error("ERROR:", err);
  }
  // [END auth_cloud_implicit]
};
//author: Saket Gulhane th-10
const authCloudExplicit = async ({ projectId, keyFilename }) => {
  // [START auth_cloud_explicit]
  // Imports the Google Cloud client library.
  const { Storage } = require("@google-cloud/storage");
  //author: Saket Gulhane th-10
  // Instantiates a client. Explicitly use service account credentials by
  // specifying the private key file. All clients in google-cloud-node have this
  // helper, see https://github.com/GoogleCloudPlatform/google-cloud-node/blob/master/docs/authentication.md
  // const projectId = 'project-id'
  // const keyFilename = '/path/to/keyfile.json'
  const storage = new Storage({ projectId, keyFilename });

  // Makes an authenticated API request.
  try {
    const [buckets] = await storage.getBuckets();

    console.log("Buckets:");
    buckets.forEach((bucket) => {
      console.log(bucket.name);
    });
  } catch (err) {
    console.error("ERROR:", err);
  }
  // [END auth_cloud_explicit]
};

const cli = require(`yargs`)
  .demand(1)
  .command(
    `auth-cloud-implicit`,
    `Loads credentials implicitly.`,
    {},
    authCloudImplicit
  )
  .command(
    `auth-cloud-explicit`,
    `Loads credentials explicitly.`,
    {
      projectId: {
        alias: "p",
        default: process.env.GCLOUD_PROJECT,
      },
      keyFilename: {
        alias: "k",
        default: process.env.GOOGLE_APPLICATION_CREDENTIALS,
      },
    },
    authCloudExplicit
  )
  .example(`node $0 implicit`, `Loads credentials implicitly.`)
  .example(`node $0 explicit`, `Loads credentials explicitly.`)
  .wrap(120)
  .recommendCommands()
  .epilogue(
    `For more information, see https://cloud.google.com/docs/authentication`
  )
  .help()
  .strict();

if (module === require.main) {
  cli.parse(process.argv.slice(2));
}
