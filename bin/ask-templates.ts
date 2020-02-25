#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { AskTemplatesStack } from '../lib/ask-templates-stack';

const app = new cdk.App();
new AskTemplatesStack(app, 'AskTemplatesStack');
