import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Strategy } from 'passport-local';

Injectable();
export class LocalAuthGuard2 extends AuthGuard('local') {}
