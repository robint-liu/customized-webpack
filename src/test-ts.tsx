import * as React from "react";

export interface HelloProps {
    compiler: string;
    framework: string;
}

export const Hello = (props: HelloProps) => <p>Hello from {props.compiler} and {props.framework}!</p>;

