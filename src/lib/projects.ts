import type { CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/**
 * Filter projects by status, excluding archived
 */
export function getActiveProjects(projects: Project[]): Project[] {
  return projects.filter(p => p.data.status !== 'Archived');
}

/**
 * Sort projects by order field (ascending)
 */
export function sortProjectsByOrder(projects: Project[]): Project[] {
  return [...projects].sort((a, b) => a.data.order - b.data.order);
}

/**
 * Get featured projects only
 */
export function getFeaturedProjects(projects: Project[]): Project[] {
  return projects.filter(p => p.data.featured === true);
}
