import { v4 as uuid } from 'uuid';

import IPattern from '@/lib/domain/IPattern';

class PatternFactory {
    create(): IPattern {
        return { id: uuid(), name: '', kilometerInterval: 0, timeIntervalInDays: 0 };
    }
}

export default new PatternFactory();
