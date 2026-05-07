import React from "react"

type AvatarDescriptionProps = {
    children: React.ReactNode;
}
export function AvatarDescription( {children}: AvatarDescriptionProps ) {
    return (
        <div className="text-gray-300 text-body-xs">
            {children}
        </div>
    )
}