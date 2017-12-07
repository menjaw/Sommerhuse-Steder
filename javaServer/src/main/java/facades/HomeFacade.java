package facades;

import entity.Home;
import entity.Place;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;


// @author Lasse
 
public class HomeFacade {
    
    EntityManagerFactory emf;
    
    public HomeFacade(EntityManagerFactory emf) {
        this.emf = emf;
    }

    public HomeFacade() {
        throw new UnsupportedOperationException("Not supported yet.");
    }

    private EntityManager getEntityManager() {
        return emf.createEntityManager();
    }
    
    

        public List<Home> getHomes() {
        EntityManager em = getEntityManager();
        List<Home> homeList = new ArrayList();
        try {
            Query query = em.createQuery("SELECT e FROM SEED_HOME e");
            homeList = query.getResultList();
            return homeList;
        } catch (Exception e) {
            System.out.println("Desvaerre gik der noget galt");
        } finally {
            em.close();
        }
        return null;
    }
        

    public Home getHome(Long id) {
        EntityManager em = emf.createEntityManager();
        Home h = null;
        try {
            em.getTransaction().begin();
            h = em.find(Home.class, (long) id);
            em.getTransaction().commit();
        } finally {
            em.close();
        }
        return h;
    }
    
    
}
