class TokenService {
    private static instance: TokenService
    private accessToken: null | string = null

    private constructor() {}

    static getInstance(): TokenService {
        if (!TokenService.instance) {
            TokenService.instance = new TokenService()
        }
        return TokenService.instance
    }

    setToken(token: string) {
        this.accessToken = token
    }

    getToken(): string | null {
        return this.accessToken
    }

    clearToken() {
        this.accessToken = null
    }
}

export const tokenService = TokenService.getInstance()
