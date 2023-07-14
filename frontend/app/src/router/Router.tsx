import { CommonLayout } from "componens/layout/CommonLayout"
import { Home } from "componens/pages/Home "
import { Page404 } from "componens/pages/Page404"
import { SignIn } from "componens/pages/SignIn"
import { SignUp } from "componens/pages/SignUp"
import { Users } from "componens/pages/Users"
import { FC, memo } from "react"
import { Routes, Route } from "react-router-dom"

export const Router: FC = memo(() => {
  return (
    <Routes>
      <Route path="/" element={<CommonLayout><Home /></CommonLayout>} />
      <Route path="/users" element={<CommonLayout><Users /></CommonLayout>} />
      <Route path="/signup" element={<CommonLayout><SignUp /></CommonLayout>} />
      <Route path="/signin" element={<CommonLayout><SignIn /></CommonLayout>} />
      <Route path="*" element={<CommonLayout><Page404 /></CommonLayout>} />
      {/* <Route path="/views" element={<CommonLayout><ALLView /></CommonLayout>} />
      <Route path="/views/:id" element={<CommonLayout><ViewsDetailPage /></CommonLayout>} />
      <Route path="/search" element={<CommonLayout><Search /></CommonLayout>} /> */}
    </Routes>
  )
})
