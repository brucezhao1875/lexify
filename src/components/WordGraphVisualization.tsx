'use client';

/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { WordGraph, GraphNode, RootInfo, WordInfo } from '@/types';
import { Badge } from '@/components/ui/Badge';

interface WordGraphVisualizationProps {
  graph: WordGraph;
  className?: string;
}

export function WordGraphVisualization({ graph, className = '' }: WordGraphVisualizationProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  useEffect(() => {
    if (!svgRef.current || !graph) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const height = 400;

    // 清除之前的内容
    svg.selectAll('*').remove();

    // 创建缩放行为
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.5, 3])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // 创建主要的组
    const g = svg.append('g');

    // 创建力导向布局
    const simulation = d3.forceSimulation(graph.nodes as any)
      .force('link', d3.forceLink(graph.edges)
        .id((d: any) => d.id)
        .distance(80)
      )
      .force('charge', d3.forceManyBody().strength(-300))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(30));

    // 创建箭头标记
    svg.append('defs').selectAll('marker')
      .data(['contains', 'derived_from', 'related_to'])
      .enter().append('marker')
      .attr('id', d => `arrow-${d}`)
      .attr('viewBox', '0 -5 10 10')
      .attr('refX', 25)
      .attr('refY', 0)
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', 'M0,-5L10,0L0,5')
      .attr('fill', d => {
        const colors = {
          contains: '#3b82f6',
          derived_from: '#10b981',
          related_to: '#f59e0b'
        };
        return colors[d as keyof typeof colors];
      });

    // 创建边
    const link = g.append('g')
      .selectAll('line')
      .data(graph.edges)
      .enter().append('line')
      .attr('stroke', d => {
        const colors = {
          contains: '#3b82f6',
          derived_from: '#10b981',
          related_to: '#f59e0b'
        };
        return colors[d.type as keyof typeof colors];
      })
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.6)
      .attr('marker-end', d => `url(#arrow-${d.type})`);

    // 创建节点组
    const node = g.append('g')
      .selectAll('g')
      .data(graph.nodes)
      .enter().append('g')
      .attr('class', 'node')
      .call(d3.drag<SVGGElement, GraphNode>()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended)
      );

    // 添加节点圆圈
    node.append('circle')
      .attr('r', d => d.type === 'root' ? 25 : 20)
      .attr('fill', d => {
        if (d.id === graph.centerWord) return '#ef4444'; // 中心词为红色
        if (d.type === 'root') return '#8b5cf6'; // 词根为紫色
        return '#3b82f6'; // 普通单词为蓝色
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 2)
      .style('cursor', 'pointer')
      .on('mouseenter', function(event: any, d: GraphNode) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', d.type === 'root' ? 30 : 25);
        setHoveredNode(d);
      })
      .on('mouseleave', function(event: any, d: GraphNode) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', d.type === 'root' ? 25 : 20);
        setHoveredNode(null);
      })
      .on('click', (event, d) => {
        setSelectedNode(d);
      });

    // 添加节点文本
    node.append('text')
      .text(d => {
        // 如果文本太长，截断它
        const maxLength = 10;
        return d.label.length > maxLength ? d.label.substring(0, maxLength) + '...' : d.label;
      })
      .attr('text-anchor', 'middle')
      .attr('dy', '.35em')
      .style('fill', 'white')
      .style('font-size', '12px')
      .style('font-weight', 'bold')
      .style('pointer-events', 'none');

    // 更新位置
    simulation.on('tick', () => {
      link
        .attr('x1', (d: any) => (d.source as GraphNode).x || 0)
        .attr('y1', (d: any) => (d.source as GraphNode).y || 0)
        .attr('x2', (d: any) => (d.target as GraphNode).x || 0)
        .attr('y2', (d: any) => (d.target as GraphNode).y || 0);

      node
        .attr('transform', (d: GraphNode) => `translate(${d.x || 0},${d.y || 0})`);
    });

    // 拖拽函数
    function dragstarted(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }

    return () => {
      simulation.stop();
    };
  }, [graph]);

  const getNodeInfo = (node: GraphNode) => {
    if (node.type === 'root') {
      const rootInfo = node.data as RootInfo;
      return {
        title: `词根: ${node.label}`,
        meaning: rootInfo.meaning,
        origin: rootInfo.origin,
        examples: rootInfo.examples
      };
    } else {
      const wordInfo = node.data as WordInfo;
      return {
        title: `单词: ${node.label}`,
        meaning: wordInfo.meaning,
        level: wordInfo.level,
        roots: wordInfo.roots
      };
    }
  };

  
  return (
    <div className={`relative ${className}`}>
      <svg
        ref={svgRef}
        width="100%"
        height="400"
        className="border border-gray-200 rounded-lg bg-white"
      />
      
      {/* 图例 */}
      <div className="absolute top-4 left-4 bg-white bg-opacity-90 p-3 rounded-lg border border-gray-200">
        <h4 className="font-semibold text-sm mb-2">图例</h4>
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-xs">中心词</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-xs">词根</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span className="text-xs">相关词</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-200">
          <h4 className="font-semibold text-sm mb-1">连接类型</h4>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-blue-500"></div>
              <span className="text-xs">包含</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-green-500"></div>
              <span className="text-xs">源自</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-yellow-500"></div>
              <span className="text-xs">相关</span>
            </div>
          </div>
        </div>
      </div>

      {/* 节点信息弹窗 */}
      {selectedNode && (
        <div className="absolute top-4 right-4 bg-white bg-opacity-95 p-4 rounded-lg border border-gray-200 max-w-xs">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">{getNodeInfo(selectedNode).title}</h3>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <div className="space-y-2 text-sm">
            <div>
              <span className="font-medium">含义：</span>
              <span>{getNodeInfo(selectedNode).meaning}</span>
            </div>
            {selectedNode.type === 'root' && (
              <div>
                <span className="font-medium">来源：</span>
                <Badge variant="secondary" className="text-xs">
                  {getNodeInfo(selectedNode).origin?.toUpperCase()}
                </Badge>
              </div>
            )}
            {selectedNode.type === 'word' && getNodeInfo(selectedNode).roots && (
              <div>
                <span className="font-medium">词根：</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {getNodeInfo(selectedNode).roots?.map((root: string) => (
                    <Badge key={root} variant="outline" className="text-xs">
                      {root}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 悬停提示 */}
      {hoveredNode && !selectedNode && (
        <div className="absolute bottom-4 left-4 bg-gray-800 text-white p-2 rounded text-xs">
          {hoveredNode.type === 'word' ? 
            `${hoveredNode.label}: ${(hoveredNode.data as WordInfo).meaning}` :
            `词根 ${hoveredNode.label}: ${(hoveredNode.data as RootInfo).meaning}`
          }
        </div>
      )}
    </div>
  );
}