import React, { useState, useContext,  FC, memo, ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"
import Cookies from "js-cookie"

import { AuthContext } from "App"
import { signUp } from "lib/api/auth"
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react"
import { useMessage } from "hooks/useMessage"
import { PrimaryButton } from "componens/atoms/button/PrimaryButton"
import { SignUpData } from "types/api"


export const SignUp: FC = memo(() => {
  const navigate = useNavigate()

  const { setIsSignedIn, setCurrentUser, loading, setLoading } = useContext(AuthContext)

  const [name, setName] = useState<string>("")
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordConfirmation, setPasswordConfirmation] = useState<string>("")
  const {showMessage} = useMessage();

  const onChangeName = (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)
  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const onChangePassword  = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)
  const onChangePasswordConfirmation = (e: ChangeEvent<HTMLInputElement>) => setPasswordConfirmation(e.target.value)

  const onClickSignup = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()

    const data: SignUpData = {
      name: name,
      email: email,
      password: password,
      passwordConfirmation: passwordConfirmation,
      confirm_success_url: "http://localhost:4000/signin"
    }

    try {
      const res = await signUp(data)
      console.log(res)

      if (res.status === 200) {
        // アカウント作成と同時にサインインさせてしまう
        // 本来であればメール確認などを挟むべきだが、今回はサンプルなので
        showMessage({title: '登録メールアドレスにユーザー認証メールを送信しました。認証が完了しましたら、ログインしてください。', status: "success"})

        // Cookies.set("_access_token", res.headers["access-token"])
        // Cookies.set("_client", res.headers["client"])
        // Cookies.set("_uid", res.headers["uid"])

        // setIsSignedIn(true)
        // setCurrentUser(res.data.data)

        // navigate("/signin", {state: {message: '登録メールアドレスにユーザー認証メールを送信しました。認証が完了しましたら、ログインしてください。'}})
        navigate("/signin")
        console.log("Signed in successfully!")
      } else {
        showMessage({title: "メールアドレスまたはパスワードが間違っています", status: "error"})
      }
    } catch (err) {
      showMessage({title: "メールアドレスまたはパスワードが間違っています", status: "error"})
    }
  }

  return (
    <Flex align="center" justify="center" height="90vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="lg">
        <Heading as="h1" size="md" textAlign="center" my={3}>新規登録</Heading>
        <Divider my={3} />
        <Stack spacing={4} px={6} py={2}>
          <Input placeholder="名前" value={name} onChange={onChangeName} />
          <Input placeholder="メールアドレス" value={email} onChange={onChangeEmail} />
          <Input placeholder="パスワード" type="password" value={password} onChange={onChangePassword} />
          <Input placeholder="パスワード" type="password" value={passwordConfirmation} onChange={onChangePasswordConfirmation} />
          <PrimaryButton isDisabled={name === "" || email === "" || password === "" || passwordConfirmation === "" }
          loading={loading} onClick={onClickSignup}>新規登録</PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
})
