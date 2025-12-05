# Domain Services

Domain services contain logic that doesn't belong to a single entity:

```go
// AuthService handles authentication logic
type AuthService struct {
    jwtSecret     string
    tokenDuration time.Duration
}

func NewAuthService(secret string) *AuthService {
    return &AuthService{
        jwtSecret:     secret,
        tokenDuration: 24 * time.Hour,
    }
}

func (s *AuthService) GenerateToken(user *User) (string, error) {
    claims := jwt.MapClaims{
        "user_id": user.ID,
        "email":   user.Email,
        "exp":     time.Now().Add(s.tokenDuration).Unix(),
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
    return token.SignedString([]byte(s.jwtSecret))
}
```

## When to Use a Domain Service

- Logic involves multiple entities
- Logic doesn't naturally belong to one entity
- Stateless operations
- Examples: Pricing calculations, authentication, validation rules