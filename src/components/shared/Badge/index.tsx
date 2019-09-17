import React from 'react'
import { ERROR } from '../../../types'

interface Props {
    errorType: ERROR
}

export const Badge = ({ errorType }: Props) => {
    return errorType === ERROR.NONE ? <></> : <span className={'badge badge-' + errorType.toLowerCase().toString()}>{errorType.toString()}</span>
}

export default Badge
