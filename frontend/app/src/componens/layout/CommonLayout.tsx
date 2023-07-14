import { Header } from "componens/organisms/layout/Header"
import { FC, memo, ReactNode } from "react"

type Props = {
  children: ReactNode
}
export const CommonLayout: FC<Props> = memo((props) => {
  const {children} = props;
  return (
    <>
      <Header />
      {children}
    </>
  )
})
