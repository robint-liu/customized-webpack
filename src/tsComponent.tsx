import * as React from "react";

export interface HelloProps {
    compiler: string;
    framework: string;
}

export const Hello = (props: HelloProps) => <h3>it`s doing from {props.compiler} and {props.framework}!</h3>;
