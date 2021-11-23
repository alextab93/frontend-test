import React, { useCallback, useState } from "react";
import { MailIcon, KeyIcon } from "@heroicons/react/solid";
import { useQueryClient } from "react-query";

import { Input, Button } from "_components";
import { validEmail } from "_helpers/validation";
import { useLogIn } from "_mutations";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const { mutateAsync: createSession } = useLogIn();

  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const onEmailChange = useCallback(
    (value) => {
      setEmail(value);
      if (!validEmail(value)) {
        setEmailError("Invalid email");
      } else {
        setEmailError(null);
      }
    },
    [setEmail]
  );

  const onPasswordChange = useCallback(
    (value) => {
      setPassword(value);
      // if (!validPassword(value)) {
      //   setPasswordError("Invalid password");
      // } else {
      //   setPasswordError(null);
      // }
    },
    [setPassword]
  );

  const onSubmitLogin = useCallback(async () => {
    console.log("creating session");
    await createSession({
      email,
      password,
    });

    queryClient.invalidateQueries("current-user");
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
            hasError={emailError}
          />
          {emailError ? <Input.ErrorMessage message={emailError} /> : null}
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
            hasError={passwordError}
          />
          {passwordError ? (
            <Input.ErrorMessage message={passwordError} />
          ) : null}
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
