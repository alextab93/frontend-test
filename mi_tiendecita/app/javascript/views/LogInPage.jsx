import React, { useCallback, useState } from "react";
import { MailIcon, KeyIcon } from "@heroicons/react/solid";
import { useQueryClient } from "react-query";

import { Input, Button } from "_components";
import { useLogIn } from "_mutations";
import { useNavigation } from "_hooks";

export default function LogInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const { mutateAsync: createSession } = useLogIn();
  const navigation = useNavigation();

  const [loginError, setLoginError] = useState(null);

  const onEmailChange = useCallback(
    (value) => {
      setEmail(value);
      setLoginError(null);
    },
    [setEmail]
  );

  const onPasswordChange = useCallback(
    (value) => {
      setPassword(value);
      setLoginError(null);
    },
    [setPassword]
  );

  const onSubmitLogin = useCallback(async () => {
    try {
      await createSession({
        email,
        password,
      });
      navigation.navigate("/home");
      queryClient.invalidateQueries("session");
    } catch (error) {
      setLoginError(error.data[0]);
    }
  }, [email, password, createSession]);

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex-col items-center w-1/4 space-y-4 shadow-lg px-4 py-8 rounded-2xl border border-gray-200">
        <Input.Group>
          <Input.Label>Email</Input.Label>
          <Input.Text
            className="rounded-full"
            Icon={MailIcon}
            type="email"
            name="email"
            id="email"
            placeholder="you@example.com"
            value={email}
            onValueChange={onEmailChange}
            hasError={loginError}
          />
        </Input.Group>
        <Input.Group>
          <Input.Label>Password</Input.Label>
          <Input.Text
            className="rounded-full"
            Icon={KeyIcon}
            type="password"
            name="password"
            id="password"
            placeholder="password"
            autoComplete="current-password"
            value={password}
            onValueChange={onPasswordChange}
            hasError={loginError}
          />
          {loginError ? <Input.ErrorMessage message={loginError} /> : null}
        </Input.Group>

        <Button
          label="LogIn"
          size="md"
          stretched
          rounded
          onClick={onSubmitLogin}
        />
      </div>
    </div>
  );
}
