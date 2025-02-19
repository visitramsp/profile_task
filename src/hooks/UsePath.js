import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TAB_HEIGHT, width } from '../theme';
import { curveBasis, line } from 'd3-shape';
import { useMemo } from 'react';
import { parse } from 'react-native-redash';

const SCALE = 0.7;
const TAB_BAR_HEIGHT = TAB_HEIGHT;

const generateTabShapePath = (position, adjustedHeight, adjustedWidth) => {
  const tabX = adjustedWidth * position;

  const lineGenerator = line().curve(curveBasis);
  const tab = lineGenerator([
    [tabX - 100 * SCALE, 0],
    [tabX - (65 + 35) * SCALE, 0],
    [tabX - (50 - 0) * SCALE, -6 * SCALE],
    [tabX - (50 - 15) * SCALE, (adjustedHeight - 14) * SCALE],
    [tabX + (50 - 15) * SCALE, (adjustedHeight - 14) * SCALE],
    [tabX + (50 - 0) * SCALE, -6 * SCALE],
    [tabX + (65 + 35) * SCALE, 0],
    [tabX + 100 * SCALE, 0]
  ]);

  return `${tab}`;
};

const usePath = (numTabs) => {
  const insets = useSafeAreaInsets();
  const tHeight = TAB_BAR_HEIGHT + insets.bottom;
  const adjustedHeight = tHeight - insets.bottom;
  const adjustedWidth = width / numTabs;

  const containerPath = useMemo(() => {
    return `M0,0L${width},0L${width},0L${width},${tHeight}L0,${tHeight}L0,0`;
  }, [tHeight]);

  const curvedPaths = useMemo(() => {
    return Array.from({ length: numTabs }, (_, index) => {
      const tabShapePath = generateTabShapePath(
        index + 0.5,
        adjustedHeight,
        adjustedWidth
      );
      return parse(`${tabShapePath}`);
    });
  }, [adjustedHeight, adjustedWidth, numTabs]);

  return { containerPath, curvedPaths, tHeight };
};

export default usePath;
