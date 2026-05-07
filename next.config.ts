import type { NextConfig } from "next";
import createMDX from '@next/mdx'

const withMDX = createMDX()

const nextConfig: NextConfig = {
  /* config options here */
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  reactStrictMode: true,
};

export default withMDX(nextConfig)

