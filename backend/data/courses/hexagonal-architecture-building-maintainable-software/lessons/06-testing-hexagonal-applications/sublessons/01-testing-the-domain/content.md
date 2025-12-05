# Testing the Domain

Domain tests are pure unit tests - no mocks needed!

```go
func TestNewUser_ValidInput(t *testing.T) {
    user, err := entities.NewUser("John", "john@example.com")

    assert.NoError(t, err)
    assert.Equal(t, "John", user.Name)
    assert.Equal(t, "john@example.com", user.Email)
    assert.NotEmpty(t, user.ID)
}

func TestNewUser_InvalidEmail(t *testing.T) {
    _, err := entities.NewUser("John", "invalid-email")

    assert.ErrorIs(t, err, entities.ErrInvalidEmail)
}

func TestNewUser_ShortName(t *testing.T) {
    _, err := entities.NewUser("J", "john@example.com")

    assert.ErrorIs(t, err, entities.ErrNameTooShort)
}

func TestMoney_Add_SameCurrency(t *testing.T) {
    m1, _ := entities.NewMoney(100, "USD")
    m2, _ := entities.NewMoney(50, "USD")

    result, err := m1.Add(m2)

    assert.NoError(t, err)
    assert.Equal(t, int64(150), result.Amount())
}
```

These tests run in **milliseconds** with no external dependencies!