import {
  Application
} from "https://deno.land/x/oak/mod.ts";
import  {Router} from "https://deno.land/x/oak/mod.ts";
import  {
  applyGraphQL,
  gql,
  GQLError,
} from "https://deno.land/x/oak_graphql/mod.ts";
import { MongoClient } from "https://deno.land/x/mongo/mod.ts";
//import _ from "https://deno.land/x/deno_lodash/mod.ts";
//import _ from "https://deno.land/x/lodash@4.17.19";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { time } from "https://deno.land/x/time.ts/mod.ts";
//import * as win32 from 'https://deno.land/std@v0.61.0/path/win32.ts';
//import * as posix from 'https://deno.land/std@v0.61.0/path/posix.ts';

//import { gql } from "https://deno.land/x/oak_graphql/mod.ts";

export  {
  Router,
  
  // win32,
  //posix,
};

export { applyGraphQL, gql, time, MongoClient, config, GQLError, Application }