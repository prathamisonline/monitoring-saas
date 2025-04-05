// apps/api/src/auth/session.serializer.ts
import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  serializeUser(user: any, done: Function) {
    // Save only essential info in session
    done(null, user);
  }

  deserializeUser(payload: any, done: Function) {
    // Restore user object from session
    done(null, payload);
  }
}
