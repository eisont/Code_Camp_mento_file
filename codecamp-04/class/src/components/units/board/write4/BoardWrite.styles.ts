import styled from '@emotion/styled'
import { IMyButtonProps } from './BoardWrite.types'

export const MyInput = styled.input`

`

export const MyButton = styled.button`
    background-color: ${(props: IMyButtonProps) => props.qqq === true ? "yellow" : "gray"};
    font-size: 30px;
`