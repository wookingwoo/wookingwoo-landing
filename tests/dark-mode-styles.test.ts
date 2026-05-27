import { readFileSync } from 'node:fs';
import { strict as assert } from 'node:assert';
import { test } from 'node:test';

const readSource = (path: string) => readFileSync(path, 'utf8');

test('dark theme uses a deep midnight background and luminous accent tokens', () => {
    const globals = readSource('styles/globals.css');

    assert.match(globals, /--background-rgb:\s*8,\s*13,\s*24/);
    assert.match(globals, /--dark-accent:\s*56,\s*189,\s*248/);
});

test('header dark mode is translucent and layered', () => {
    const header = readSource('components/Header.tsx');

    assert.match(header, /dark:bg-slate-950\/85/);
    assert.match(header, /dark:border-slate-800\/80/);
    assert.match(header, /backdrop-blur/);
});

test('dark cards use a clearly raised surface against the page background', () => {
    const projectCard = readSource('components/ProjectCard.tsx');
    const techStack = readSource('components/TechStack.tsx');
    const page = readSource('pages/index.tsx');
    const travelMap = readSource('components/TravelMap.tsx');

    for (const source of [projectCard, techStack, page, travelMap]) {
        assert.match(source, /dark:border-slate-700\/70/);
        assert.match(source, /dark:bg-slate-800\/80/);
        assert.match(source, /dark:ring-white\/5/);
        assert.match(source, /dark:shadow-black\/30/);
    }
});

test('dark mode keeps cyan-blue accents for interactive elements', () => {
    const sources = [
        readSource('styles/globals.css'),
        readSource('components/Header.tsx'),
        readSource('components/ProjectCard.tsx'),
        readSource('components/TechStack.tsx'),
    ].join('\n');

    assert.match(sources, /dark:hover:text-sky-300/);
    assert.match(sources, /dark:bg-sky-400\/10/);
    assert.match(sources, /dark:hover:bg-sky-400/);
});

test('project card hover keeps the dark ring stable during hover animation', () => {
    const globals = readSource('styles/globals.css');
    const hoverRule = globals.match(/\.project-card:hover\s*{([^}]*)}/);
    const darkHoverRule = globals.match(/html\.dark \.project-card:hover\s*{([^}]*)}/);

    assert.match(globals, /\.project-card\s*{\s*transition:\s*box-shadow 0\.2s ease;\s*}/);
    assert.ok(hoverRule?.[1]);
    assert.ok(darkHoverRule?.[1]);

    assert.doesNotMatch(hoverRule[1], /transform\s*:/);
    assert.match(hoverRule[1], /--tw-shadow:/);
    assert.match(hoverRule[1], /box-shadow:\s*var\(--tw-ring-offset-shadow/);
    assert.match(hoverRule[1], /var\(--tw-ring-shadow/);

    assert.match(darkHoverRule[1], /--tw-shadow:/);
    assert.doesNotMatch(darkHoverRule[1], /box-shadow\s*:/);
});
