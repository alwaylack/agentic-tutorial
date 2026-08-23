#!/usr/bin/env python3
"""重排 pi-agent 章节顺序：theory 在前，practice 在后"""
import re

# 新映射：新章号 -> (原文件, 新标题)
reorder = {
    '19': ('ch22.md', '可观测性：Telemetry 与 Span 追踪'),
    '20': ('ch23.md', '终端用户界面：pi-tui 与差量渲染'),
    '21': ('ch19.md', '实战一：测试智能体——从需求到测试用例'),
    '22': ('ch20.md', '实战二：测试智能体——自动化执行与报告'),
    '23': ('ch21.md', '实战三：测试智能体——CI 集成与定时回归巡检'),
}

# 链接映射：旧 chNN -> 新 chNN
link_map = {
    'ch18': 'ch18',
    'ch19': 'ch21',
    'ch20': 'ch22',
    'ch21': 'ch23',
    'ch22': 'ch19',
    'ch23': 'ch20',
}

BASE = '/Users/gaoxueling/Desktop/study/agentic-tutorial/docs/pi-agent'

for new_n, (orig_file, title) in reorder.items():
    src = f'{BASE}/{orig_file}'
    dst = f'{BASE}/ch{new_n}.md'
    content = open(src).read()
    # 修正 H1
    content = re.sub(
        r'^# 第 \d+ 章 · .+',
        f'# 第 {new_n} 章 · {title}',
        content, count=1, flags=re.M
    )
    # 修正链接
    for old_l, new_l in link_map.items():
        if old_l != new_l:
            content = content.replace(f'](./{old_l})', f'](./{new_l})')
    open(dst, 'w').write(content)
    print(f'  ✅ ch{new_n}.md <- {orig_file} ({title})')

print('完成')
