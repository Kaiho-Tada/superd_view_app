import { Button } from "@chakra-ui/react";
import { FC, memo, ReactNode } from "react";


type Props = {
  children: ReactNode;
  isDisabled?: boolean;
  loading?: boolean;
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
export const PrimaryButton: FC<Props> = memo((props) => {
  const {children, isDisabled = false, loading = false, onClick} = props;
  return (
    <Button bg="teal.400" color="white" _hover={{opacity: 0.6}}
    onClick={onClick} isLoading={loading} isDisabled={isDisabled || loading}>
      {children}
    </Button>
  )
})
