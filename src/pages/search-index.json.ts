import type { APIRoute } from 'astro';
import { getSearchIndex } from '../lib/glossary';

export const GET: APIRoute = () => {
  return new Response(JSON.stringify(getSearchIndex()), {
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
  });
};
