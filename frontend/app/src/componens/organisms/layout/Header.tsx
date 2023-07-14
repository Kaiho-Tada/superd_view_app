import { FC, memo, useCallback, useContext } from "react"
import {Flex, Heading, Box, Link, useDisclosure} from "@chakra-ui/react"
import { MenuIconButton } from "componens/atoms/button/MenuIconButton"
import { MenuDrawer } from "componens/molecules/MenuDrawer"
import { useNavigate } from "react-router-dom"
import { AuthContext } from "App"
import { useMessage } from "hooks/useMessage"
import { signOut } from "lib/api/auth"
import Cookies from "js-cookie"

export const Header: FC = memo(() => {

  const navigate = useNavigate();
  const onClickHome = useCallback(() => navigate("/"), [navigate])
  const onClickUsers = useCallback(() => navigate("/users"), [navigate])
  const onClickSignIn = useCallback(() => navigate("/signin"), [navigate])
  const onClickSignUp = useCallback(() => navigate("/signup"), [navigate])

  const {
    isOpen: isOpenMenuDrawer,
    onOpen: onOpenMenuDrawer,
    onClose: onCloseMenuDrawer
  } = useDisclosure()

  const { loading, isSignedIn, setIsSignedIn } = useContext(AuthContext)
  const {showMessage} = useMessage();

  const handleSignOut = async () => {
    try {
      const res = await signOut()

      if (res.data.success === true) {
        // サインアウト時には各Cookieを削除
        Cookies.remove("_access_token")
        Cookies.remove("_client")
        Cookies.remove("_uid")

        setIsSignedIn(false)
        navigate("/signin")

        showMessage({title: "サインアウトしました", status: "success"})
      } else {
        showMessage({title: "サインアウトに失敗しました", status: "error"})
      }
    } catch (err) {
      showMessage({title: "サインアウトに失敗しました", status: "error"})
    }
  }

  const AuthLinks = () => {
    // 認証完了後はサインアウト用のボタンを表示
    // 未認証時は認証用のボタンを表示
    if (!loading) {
      if (isSignedIn) {
        return (
          <Link
            color="inherit"
            onClick={handleSignOut}
          >
            サインアウト
          </Link>
        )
      } else {
        return (
          <>
            <Link pr={4} onClick={onClickSignIn}>ログイン</Link>
            <Link pr={4} onClick={onClickSignUp}>新規登録</Link>
          </>

        )
      }
    } else {
      return <></>
    }
  }



  return (
    <>
      <Flex as="nav" bg="teal.500" color="gray.50" align="center"
      justify="space-between" padding={{base: 3, md: 5}}>
        <Flex align="center" as="a" mr={8} _hover={{cursor: "pointer"}} onClick={onClickHome} >
          <Heading as="h1" fontSize={{ base: "md", md: "lg" }}>世界の絶景アプリ</Heading>
        </Flex>
        <Flex align="center" fontSize="sm" flexGrow={2} display={{ base: "none", md: "flex"}}  >
          <Box pr={4}>
            <Link onClick={onClickUsers} >ユーザー一覧</Link>
          </Box>
          <Link>絶景一覧</Link>
        </Flex>
        <Flex align="center" fontSize="sm" display={{ base: "none", md: "flex"}}>
          <AuthLinks />
        </Flex>
        <MenuIconButton onOpenMenuDrawer={onOpenMenuDrawer} />
      </Flex>
      <MenuDrawer onCloseMenuDrawer={onCloseMenuDrawer} isOpenMenuDrawer={isOpenMenuDrawer}
      onClickHome={onClickHome} onClickUsers={onClickUsers} />
    </>

  )
})
