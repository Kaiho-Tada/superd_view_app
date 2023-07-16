import { ChangeEvent, FC, memo, useContext, useState } from "react"
import { Box, Divider, Flex, Heading, Input, Stack } from "@chakra-ui/react"
import { PrimaryButton } from "componens/atoms/button/PrimaryButton"
import { useNavigate, useLocation } from "react-router-dom"
import { AuthContext } from "App"
import { SignInData } from "types/api"
import { useMessage } from "hooks/useMessage"
import { signIn } from "lib/api/auth"
import Cookies from "js-cookie"




export const SignIn: FC = memo(() => {

  const navigate = useNavigate();
  const { setIsSignedIn, setCurrentUser, loading, setLoading } = useContext(AuthContext)
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const {showMessage} = useMessage();

  const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const onChangePassword  = (e: ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  const onClickLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setLoading(true)

    const data: SignInData = {
      email: email,
      password: password
    }

    try {
      const res = await signIn(data)
      console.log(res)

      if (res.status === 200) {
        showMessage({title: "ログインしました", status: "success"})
        // 成功した場合はCookieに各値を格納
        Cookies.set("_access_token", res.headers["access-token"])
        Cookies.set("_client", res.headers["client"])
        Cookies.set("_uid", res.headers["uid"])

        setIsSignedIn(true)
        setCurrentUser(res.data.data)

        navigate("/")

        console.log("Signed in successfully!")
      } else {
        showMessage({title: "ログインに失敗しました", status: "error"})
      }
    } catch (err) {
      showMessage({title: "ログインに失敗しました", status: "error"})
    }
    setLoading(false)
  }

  // const location = useLocation();
  // type MessageState = {message: string};
  // console.log(location)
  // if (location.state !== null) {
  //   const messagestate = location.state.message as MessageState;
  //   console.log(messagestate)
  // }
  // const messagestate = location.state.message as MessageState;
  // console.log(messagestate)
  return (
    <Flex align="center" justify="center" height="90vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="lg">
        <Heading as="h1" size="md" textAlign="center" my={3}>ログイン</Heading>
        <Divider my={3} />
        {/* {location.state !== null
          ?  <Box>{messagestate}</Box>
          :  <></>
        } */}
        <Stack spacing={3} px={6} py={3}>
          <Input placeholder="メールアドレス" value={email} onChange={onChangeEmail} />
          <Input placeholder="パスワード" type="password" value={password} onChange={onChangePassword} />
          <PrimaryButton loading={loading} isDisabled={email === "" || password === ""} onClick={onClickLogin}>
            Login
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  )
})
