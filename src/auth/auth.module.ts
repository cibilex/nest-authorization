import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth.guard';

import { JwtModule, JwtSecretRequestType } from '@nestjs/jwt';

const myKey = `-----BEGIN RSA PRIVATE KEY-----
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
-----END RSA PRIVATE KEY-----`;
const publicKey = `ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAACAQCzk1tj+8Q3vjJNzt4Qk0A7gvNXJtCEy9FSvSnLMTyPZw5Soo/AAmTjbFM6dXkXQaqSf/Bv6sxnqg+t0kgJm2O77kL9siAPB5K/0Y0PZfcGNMxPsaEYDMeb+sQAkCFeoY1i7Mg/mFLyLtBU8si20bJi1PKoouTlBWLx7pgewY3sX/Wn7M9euYmwcbKDHSWXpQ7wrf15tAZ7qcYh70bly43aBjt3KXV88tetEygrO3ONH2ga59DRKhDyDWfYC24S/hkk98PEQ0evkKL4aJdxVh2Yywk5kwvgUAnBcMgWK3fupfaCMsGLG5llo4p0PoaXr0fK6Bu76YjM2xfGg9+sl+gn6dhnwt2m7yIuc7ndmRwXXHxtbaaXJi+KHpr4FzgzDnAl/SVMYOgPj0aL8uke2Mhx/VyGCfMXoOQmr4fiBSarfCH8BvjCXTSB/dKVmrIzJbkHD+27TFzb/cz2lk5P/g7BfgYAUp7aKDJO5NcNS8zc4UEE/gxymZg1zI9D0NrSI2r0TFUAbv5a2EFer5q15KTkvN9WMapOSSNU6dH14lkXpKWRSCmO5z12wDIVtUSdt1LS9D9wjT6sN78iTU14+G54JB1V7b6SvXXmhJlRVIjMxFVXpVk9el8SUPri7OfF9ZmdELQ0xvxUBXvMJjgD6SltbzqGyzDyRcxJh7xVsZ83+Q== cibilex@Mehmets-MacBook-Air.local`;
@Module({
  imports: [
    JwtModule.register({
      global: true,
      signOptions: {
        algorithm: 'RS256',
      },
      verifyOptions: {
        algorithms: ['RS256'],
      },
      secret: myKey,
      publicKey: publicKey,
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}
