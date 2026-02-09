import { prisma } from '../../lib/prisma';

export interface CreateAnnouncementDTO {
  title: string;
  content: string;
  teacherId: number;
}

export const createAnnouncement = async (data: CreateAnnouncementDTO) => {
  const announcement = await prisma.announcement.create({
    data: {
      title: data.title,
      content: data.content,
      teacherId: data.teacherId,
    },
    include: {
      teacher: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return announcement;
};

export const getAllAnnouncements = async () => {
  const announcements = await prisma.announcement.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    include: {
      teacher: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
    },
  });

  return announcements;
};

export const getAnnouncementById = async (id: number) => {
  const announcement = await prisma.announcement.findUnique({
    where: { id },
    include: {
      teacher: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      comments: {
        orderBy: {
          createdAt: 'asc',
        },
      },
    },
  });

  return announcement;
};
