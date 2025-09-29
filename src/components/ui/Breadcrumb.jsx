import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = ({ items = [] }) => {
  const location = useLocation();

  // Auto-generate breadcrumbs based on current path if no items provided
  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(Boolean);
    const breadcrumbs = [{ label: 'Dashboard', path: '/dashboard' }];

    pathSegments?.forEach((segment, index) => {
      const path = '/' + pathSegments?.slice(0, index + 1)?.join('/');
      let label = segment?.charAt(0)?.toUpperCase() + segment?.slice(1);
      
      // Convert kebab-case to readable format
      label = label?.replace(/-/g, ' ');
      
      // Custom labels for specific paths
      switch (path) {
        case '/projects-list':
          label = 'Projects';
          break;
        case '/project-detail':
          label = 'TaskFlow Mobile App';
          break;
        case '/task-detail':
          label = 'API Integration Task';
          break;
        default:
          break;
      }

      if (path !== '/dashboard') {
        breadcrumbs?.push({ label, path });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbItems = items?.length > 0 ? items : generateBreadcrumbs();

  if (breadcrumbItems?.length <= 1) {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        {breadcrumbItems?.map((item, index) => (
          <li key={item?.path} className="flex items-center space-x-2">
            {index > 0 && (
              <Icon name="ChevronRight" size={14} className="text-muted-foreground/60" />
            )}
            
            {index === breadcrumbItems?.length - 1 ? (
              // Current page - not clickable
              (<span className="font-medium text-foreground truncate max-w-xs">
                {item?.label}
              </span>)
            ) : (
              // Clickable breadcrumb
              (<Link
                to={item?.path}
                className="hover:text-foreground transition-smooth truncate max-w-xs"
                title={item?.label}
              >
                {item?.label}
              </Link>)
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;