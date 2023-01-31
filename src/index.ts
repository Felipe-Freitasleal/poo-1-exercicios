import express, { Request, Response } from "express";
import cors from "cors";
import { Videos } from "./models/Videos";
import { TVideos } from "./types";
import { VideoBAse } from "./database/VideoBase";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});

app.get("/ping", async (req: Request, res: Response) => {
  try {
    res.status(200).send({ message: "Pong!!!!**" });
  } catch (error) {
    console.log(error);

    if (req.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/videos", async (req: Request, res: Response) => {
  try {
    const query = req.query.q as string | undefined;

    /// ATIVIDADE DIA 1
    // let response;

    // if (query) {
    //   const getVideosByQuery: TVideos[] = await db("videos").where(
    //     "name",
    //     "LIKE",
    //     `%${query}%`
    //   );
    //   response = getVideosByQuery;
    // } else {
    //   const getAllVideos: TVideos[] = await db("videos");
    //   response = getAllVideos;
    // }
    const videoDatabase = new VideoBAse();
    const response = await videoDatabase.findVideoByGet(query);

    const videos: Videos[] = response.map(
      (video) =>
        new Videos(video.id, video.titulo, video.duracao, video.data_update)
    );

    res.status(200).send(videos);
  } catch (error: any) {
    console.log(error.message);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      console.log("Error inesperado.");
    }
  }
});

app.post("/videos", async (req: Request, res: Response) => {
  try {
    const { id, titulo, duracao } = req.body;

    if (typeof id !== "string") {
      res.status(400);
      throw new Error("'id' deve ser string");
    }

    if (typeof titulo !== "string") {
      res.status(400);
      throw new Error("'titulo' deve ser string");
    }

    if (typeof duracao !== "number") {
      res.status(400);
      throw new Error("'duração' deve ser um número");
    }

    // const [checkVideo] = await db("videos").where({ id: id });
    const videosDatabase = new VideoBAse();
    const checkVideo = await videosDatabase.checkVideoById(id);

    if (checkVideo) {
      res.status(400);
      throw new Error("'id' já existe");
    }

    const newVideo = new Videos(id, titulo, duracao, new Date().toISOString());

    const newVideoForDB: TVideos = {
      id: newVideo.getId(),
      titulo: newVideo.getTitulo(),
      duracao: newVideo.getDuracao(),
      data_update: newVideo.getDataUpdate(),
    };

    // await db("videos").insert(newVideoForDB);
    await videosDatabase.insertNewVideo(newVideoForDB);

    res.status(200).send({ message: "Video Upado", video: newVideoForDB });
  } catch (error: any) {
    console.log(error.message);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      console.log("Error inesperado.");
    }
  }
});

app.put("/videos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { newId, newTitulo, newDuracao, newDataUpdate } = req.body;

    // const [getVideoById] = await db("videos").where({ id });
    const videosDatabase = new VideoBAse();
    const getVideoById = await videosDatabase.checkVideoById(id);

    if (!getVideoById) {
      res.status(400);
      throw new Error("Id de video não encontrado");
    }

    if (getVideoById) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }

      if (typeof newTitulo !== "string") {
        res.status(400);
        throw new Error("'titulo' deve ser string");
      }

      if (typeof newDuracao !== "number") {
        res.status(400);
        throw new Error("'duração' deve ser um número");
      }

      if (typeof newDataUpdate !== "string") {
        res.status(400);
        throw new Error("'Data' deve ser  string");
      }

      const video = new Videos(newId, newTitulo, newDuracao, newDataUpdate);

      const updateVideo = {
        id: video.getId() || getVideoById.id,
        titulo: video.getTitulo() || getVideoById.titulo,
        duracao: video.getDuracao() || getVideoById.duracao,
        data_update: video.getDataUpdate() || getVideoById.data_update,
      };

      // await db("videos").update(updateVideo).where({ id: id });
      await videosDatabase.updateVideo(updateVideo, id);
      res
        .status(200)
        .send({ message: "Videos atualizado", video: updateVideo });
    }
  } catch (error: any) {
    console.log(error.message);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      console.log("Error inesperado.");
    }
  }
});

app.delete("/videos/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // const [getVideoById] = await db("videos").where({ id });
    const videosDatabase = new VideoBAse();
    const getVideoById = await videosDatabase.checkVideoById(id);

    if (!getVideoById) {
      res.status(400).send("Video não encontrado");
    }
    if (getVideoById) {
      // await db("videos").del().where({ id: id });
      await videosDatabase.deleteVideo(id)
      res.status(200).send({ message: "Videos excluído" });
    }
  } catch (error: any) {
    console.log(error.message);
    if (res.statusCode === 200) {
      res.status(500);
    }
    if (error instanceof Error) {
      console.log("Error inesperado.");
    }
  }
});
