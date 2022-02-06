type MenuNodeItem = {
  label: string;
  description: string;
  path: string;
  isAnchor?: boolean;
};

export type MenuNode = {
  title: string;
  items: MenuNodeItem[];
};
