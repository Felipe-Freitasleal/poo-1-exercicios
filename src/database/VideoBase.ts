import { TVideos } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class VideoBAse extends BaseDatabase {
  //atributos
  public static TABLE_VIDEOS = "videos";
  //metodos
  dadosConnection = BaseDatabase.connection;

  public async findVideoByGet(query: string | undefined): Promise<TVideos[]> {
    let response;

    if (query) {
      const getVideosByQuery: TVideos[] = await BaseDatabase.connection(
        VideoBAse.TABLE_VIDEOS
      ).where("name", "LIKE", `%${query}%`);
      response = getVideosByQuery;
    } else {
      const getAllVideos: TVideos[] = await BaseDatabase.connection(
        VideoBAse.TABLE_VIDEOS
      );
      response = getAllVideos;
    }
    return response;
  }

  public async checkVideoById(id: any): Promise<TVideos> {
    const [checkVideo] = await BaseDatabase.connection(
      VideoBAse.TABLE_VIDEOS
    ).where({ id: id });
    return checkVideo;
  }

  public async insertNewVideo(newVideoForDB: any): Promise<void> {
    await BaseDatabase.connection(VideoBAse.TABLE_VIDEOS).insert(newVideoForDB);
  }

  public async updateVideo(updateVideo: TVideos, id: string): Promise<void> {
    await BaseDatabase.connection(VideoBAse.TABLE_VIDEOS)
      .update(updateVideo)
      .where({ id: id });
  }

  public async deleteVideo(id: string): Promise<void>{
    await BaseDatabase.connection(VideoBAse.TABLE_VIDEOS).del().where({ id: id });

  }
}
