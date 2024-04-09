export const propertyDatas = {
    title: '제목',
    link: '링크',
    tags: '태그',
    type: '분류',
    category: '카테고리',
    status: '상태',
    note: '비고',
    isBookMarked: '북마크',
    isLocked: '잠김',
    createdAt: '작성 날짜',
    updatedAt: '갱신 날짜',
    creatorName: '작성자',
    updatorName: '갱신자',
};

export const sortMenus = {
    type: '분류',
    title: '제목',
    status: '상태',
    isBookMarked: '북마크',
    isLocked: '잠김',
    createdAt: '작성 날짜',
    updatedAt: '갱신 날짜',
    creatorName: '작성자',
    updatorName: '갱신자',
};

export const sortDropdownMenuDefault = {
    type: { isSelected: false, key: false, order: 'ascend' },
    title: { isSelected: false, key: false, order: 'ascend' },
    status: { isSelected: false, key: false, order: 'ascend' },
    isBookMarked: { isSelected: false, key: false, order: 'ascend' },
    isLocked: { isSelected: false, key: false, order: 'ascend' },
    createdAt: { isSelected: false, key: false, order: 'ascend' },
    updatedAt: { isSelected: false, key: false, order: 'ascend' },
    creatorName: { isSelected: false, key: false, order: 'ascend' },
    updatorName: { isSelected: false, key: false, order: 'ascend' },
};

export const filterMenus = {
    type: '분류',
    title: '제목',
    tags: '태그',
    status: '상태',
    isBookMarked: '북마크',
    isLocked: '잠김',
    creatorName: '작성자',
    updatorName: '갱신자',
};

export const filterDropdownMenuDefault = {
    type: { isSelected: false, value: '', type: 'contain' },
    title: { isSelected: false, value: '', type: 'contain' },
    tags: { isSelected: false, value: '', type: 'contain' },
    status: { isSelected: false, value: 1, type: 'contain' },
    isBookMarked: { isSelected: false, value: '', type: 'contain' },
    isLocked: { isSelected: false, value: '', type: 'contain' },
    createdAt: { isSelected: false, value: '', type: 'contain' },
    updatedAt: { isSelected: false, value: '', type: 'contain' },
    creatorName: { isSelected: false, value: '', type: 'contain' },
    updatorName: { isSelected: false, value: '', type: 'contain' },
};

export const dataTableHead = {
    title: '제목',
    category: '카테고리',
    status: '상태',
    createdAt: '작성 날짜',
    isLocked: '잠김 여부',
    note: '비고',
};

export const growthClassTypes = {
    all: '모두보기',
    store: '지식창고',
    project: '프로젝트',
    diary: '일지',
    favorite: '취미',
    think: '생각',
    none: '분류 없음',
};

export const growthSelectTypes = [
    { all: '모두보기' },
    { store: '지식창고' },
    { project: '프로젝트' },
    { diary: '일지' },
    { none: '분류 없음' },
];

export const aboutMeClassType = {
    all: '모두보기',
};

export const statusClassTyeps = { 0: '시작 전', 1: '진행 중', 2: '완료', 3: '보류' };

export const statusSelectTyeps = [{ 0: '시작 전' }, { 1: '진행 중' }, { 2: '완료' }, { 3: '보류' }];
