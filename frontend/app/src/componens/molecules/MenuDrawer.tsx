import { FC, memo } from "react"
import {Drawer, DrawerOverlay, DrawerContent, DrawerBody, Button} from "@chakra-ui/react"


type Props = {
  onCloseMenuDrawer: () => void;
  isOpenMenuDrawer: boolean;
  onClickHome: () => void;
  onClickUsers: () => void;
}
export const MenuDrawer: FC<Props> = memo((props) => {
  const {onCloseMenuDrawer, isOpenMenuDrawer, onClickHome, onClickUsers} = props
  return (
    <Drawer placement="left" size="xs" onClose={onCloseMenuDrawer} isOpen={isOpenMenuDrawer} >
      <DrawerOverlay>
          <DrawerContent>
            <DrawerBody p={0} bg="gray.100">
              <Button w="100%" onClick={() => {onClickHome(); onCloseMenuDrawer()}}>Top</Button>
              <Button w="100%" onClick={() => {onClickUsers(); onCloseMenuDrawer()}}>ユーザー一覧</Button>
              <Button w="100%">絶景一覧</Button>
            </DrawerBody>
          </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  )
})
