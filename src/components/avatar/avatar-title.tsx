import React from "react"

type AvatarTitleProps = {
    children: React.ReactNode;
}

export function AvatarTitle( {children}: AvatarTitleProps ) {
    return (
        <strong className="text-body-sm font-normal text-gray-200">
            {children}
        </strong>
    )
}