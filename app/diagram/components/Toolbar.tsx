import { 
  LuMousePointer2, 
  LuHand, 
  LuSquare, 
  LuCircle, 
  LuDiamond, 
  LuType, 
  LuArrowUpRight,
  LuTriangle,
  LuDatabase,
  LuFile,
  LuArrowRightLeft,
  LuCornerDownRight,
  LuSpline
} from 'react-icons/lu';
import { ElementType, ConnectorType } from '@/lib/types';
import { clsx } from 'clsx';

interface ToolbarProps {
  activeTool: ElementType | 'select' | 'hand';
  onSelectTool: (tool: ElementType | 'select' | 'hand') => void;
  activeConnectorType?: ConnectorType;
  onSelectConnectorType?: (type: ConnectorType) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({ 
  activeTool, 
  onSelectTool,
  activeConnectorType = 'straight',
  onSelectConnectorType
}) => {
  const tools = [
    { id: 'select', icon: LuMousePointer2, label: 'Select (V)' },
    { id: 'hand', icon: LuHand, label: 'Hand (H)' },
    { id: 'rect', icon: LuSquare, label: 'Rectangle (R)' },
    { id: 'ellipse', icon: LuCircle, label: 'Ellipse (O)' },
    { id: 'diamond', icon: LuDiamond, label: 'Diamond (D)' },
    { id: 'text', icon: LuType, label: 'Text (T)' },
    { 
      id: 'connector', 
      icon: activeConnectorType === 'elbow' ? LuCornerDownRight : activeConnectorType === 'curve' ? LuSpline : LuArrowUpRight, 
      label: 'Connector (L)',
      subOptions: [
        { type: 'straight', icon: LuArrowUpRight, label: 'Straight' },
        { type: 'elbow', icon: LuCornerDownRight, label: 'Elbow' },
        { type: 'curve', icon: LuSpline, label: 'Curve' },
      ]
    },
    { id: 'triangle', icon: LuTriangle, label: 'Triangle' },
    { id: 'cylinder', icon: LuDatabase, label: 'Database' },
    { id: 'document', icon: LuFile, label: 'Document' },
    { id: 'parallelogram', icon: LuArrowRightLeft, label: 'Input/Output' }, 
  ] as const;

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1 p-1 bg-white dark:bg-[#252526] border-2 border-black neo-shadow-sm rounded-lg overflow-visible">
        {tools.map((tool) => {
          const Icon = tool.icon;
          const isActive = activeTool === tool.id;
          
          return (
            <div key={tool.id} className="relative group flex items-center justify-center">
              <button
                onClick={() => onSelectTool(tool.id as any)}
                className={clsx(
                  "p-2.5 rounded-md transition-all flex items-center justify-center relative",
                  isActive 
                    ? "bg-[#E9945B] text-black shadow-[inset_2px_2px_0px_rgba(0,0,0,0.1)]" 
                    : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-600 dark:text-gray-300"
                )}
                title={tool.label}
              >
                <Icon className={clsx("w-5 h-5", isActive ? "stroke-[2.5px]" : "stroke-2")} />
              </button>

              {/* Tooltip */}
              {!('subOptions' in tool) && (
                <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50">
                  {tool.label}
                </div>
              )}

              {/* Sub-options Popup for Connector */}
              {'subOptions' in tool && tool.subOptions && (
                 <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 bg-white dark:bg-[#252526] border-2 border-black neo-shadow-sm rounded-lg p-1 flex gap-1 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 ease-in-out delay-150 group-hover:delay-0 z-50 after:content-[''] after:absolute after:top-full after:left-0 after:right-0 after:h-4">
                    {tool.subOptions.map((sub) => {
                      const SubIcon = sub.icon;
                      const isSubActive = activeConnectorType === sub.type;
                      return (
                        <button
                          key={sub.type}
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectTool('connector');
                            onSelectConnectorType?.(sub.type as ConnectorType);
                          }}
                          className={clsx(
                            "p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors",
                            isSubActive ? "bg-[#E9945B]/20 text-[#E9945B]" : "text-gray-600 dark:text-gray-300"
                          )}
                          title={sub.label}
                        >
                          <SubIcon className="w-4 h-4" />
                        </button>
                      );
                    })}
                 </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
