# zxp-sign

Command-line utility to self-sign a ZXP which wraps [zxp-sign-cmd](https://github.com/codearoni/zxp-sign-cmd). The purpose of this utility is to easily sign from GitHub Actions.

## Usage

```shell
npx zxp-sign \
    -i path/to/extension/ \
    -o path/to/extension.zxp
```

### Arguments

- `--input` or `-i` - Path to directory with contents for ZXP.
- `--output` or `-i` - Path to the output zxp extension.
- `--timestamp` or `-t` - Optional, timestamp URL for signing (default: `"http://timestamp.digicert.com/"`)

### Environment Variables

These things can be set in CI as environment variables.

- `ZXP_INPUT` - Same as `--input` argument
- `ZXP_OUTPUT` - Same as `--output` argument
- `ZXP_TIMESTAMP` - Same as `--timestamp` argument
- `ZXP_CERT_COUNTRY` - Country for cert (e.g., "US")
- `ZXP_CERT_PROVINCE` - Province or State for cert (e.g., "CA")
- `ZXP_CERT_ORG` - Organization name
- `ZXP_CERT_NAME` - Certificate name (e.g., the extension id)
- `ZXP_CERT_PASSWORD` - Cert password
- `ZXP_CERT_OUTPUT` - Optional cert output path (default: `${ZXP_CERT_NAME}-cert`)
