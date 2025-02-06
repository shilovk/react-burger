import React from "react";

export const Link = ({ title, url }: { title: string; url: string }) => <a href={url}>{title}</a>;
